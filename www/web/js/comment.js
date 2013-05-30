/**
 * This file is part of the FOSCommentBundle package.
 *
 * (c) FriendsOfSymfony <http://friendsofsymfony.github.com/>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * To use this reference javascript, you must also have jQuery installed. If
 * you want to embed comments cross-domain, then easyXDM CORS is also required.
 *
 * @todo: expand this explanation (also in the docs)
 *
 * Then a comment thread can be embedded on any page:
 *
 * <div id="comment_thread">#comments</div>
 * <script type="text/javascript">
 *     // Set the thread_id if you want comments to be loaded via ajax (url to thread comments api)
 *     var comment_thread_id = 'a_unique_identifier_for_the_thread';
 *     var comment_thread_api_base_url = 'http://example.org/api/threads';
 *
 *     // Optionally set the cors url if you want cross-domain AJAX (also needs easyXDM)
 *     var comment_remote_cors_url = 'http://example.org/cors/index.html';
 *
 *     // Optionally set a custom callback function to update the comment count elements
 *     var comment_thread_comment_count_callback = function(elem, threadObject){}
 *
 *     // Optionally set a different element than div#comment_thread as container
 *     var comment_thread_container = $('#other_element');
 *
 * (function() {
 *     var comment_script = document.createElement('script');
 *     comment_script.async = true;
 *     comment_script.src = 'http://example.org/path/to/this/file.js';
 *     comment_script.type = 'text/javascript';
 *
 *     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(comment_script);
 * })();
 * </script>
 */
(function (window, $, easyXDM) {
    "use strict";
    var FOS_COMMENT = {
        /**
         * Shorcut post method.
         *
         * @param string url The url of the page to post.
         * @param object data The data to be posted.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        post: function (url, data, success, error, complete) {
            // Wrap the error callback to match return data between jQuery and easyXDM
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.responseText, response.status);
                }
            };
            var wrappedCompleteCallback = function (response) {
                if ('undefined' !== typeof complete) {
                    complete(response.responseText, response.status);
                }
            };
            $.post(url, data, success).error(wrappedErrorCallback).complete(wrappedCompleteCallback);
        },

        /**
         * Shorcut get method.
         *
         * @param string url The url of the page to get.
         * @param object data The query data.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        get: function (url, data, success, error) {
            // Wrap the error callback to match return data between jQuery and easyXDM
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.responseText, response.status);
                }
            };
            $.get(url, data, success).error(wrappedErrorCallback);
        },

        /**
         * Gets the comments of a thread and places them in the thread holder.
         *
         * @param string identifier Unique identifier url for the thread comments.
         * @param string url Optional url for the thread. Defaults to current location.
         */
        getThreadComments: function (identifier, permalink) {
            var event = jQuery.Event('comment_before_load_thread');

            event.identifier = identifier;
            event.params = {
                permalink: encodeURIComponent(permalink || window.location.href)
            };
console.log(123);
            FOS_COMMENT.thread_container.trigger(event);
            FOS_COMMENT.get(
                FOS_COMMENT.base_url + '/' + encodeURIComponent(event.identifier) + '/comments',
                event.params,
                // success
                function (data) {
                    FOS_COMMENT.thread_container.html(data);
                    FOS_COMMENT.thread_container.attr('data-thread', event.identifier);
                    FOS_COMMENT.thread_container.trigger('comment_load_thread', event.identifier);
                }
            );
        },

        /**
         * Initialize the event listeners.
         */
        initializeListeners: function () {
            FOS_COMMENT.thread_container.on('submit',
                'form.comment_comment_new_form',
                function (e) {
                    console.log('form.comment_comment_new_form');
                    var that = $(this),btn = $(".comment_submit .btn", that);

                    var serializedData = FOS_COMMENT.serializeObject(this);

                    e.preventDefault();

                    var event = $.Event('comment_submitting_form');
                    that.trigger(event);

                    if (event.isDefaultPrevented()) {
                        return;
                    }

                    btn.attr("disabled",1);
                    FOS_COMMENT.post(
                        this.action,
                        serializedData,
                        // success
                        function (data, statusCode) {
                            FOS_COMMENT.appendComment(data, that);
                            that.trigger('comment_new_comment', data);
                        },
                        // error
                        function (data, statusCode) {
                            var parent = that.parent();
                            parent.after(data);
                            parent.remove();
                        },
                        // complete
                        function (data, statusCode) {
                            btn.removeAttr("disabled");
                            that.trigger('comment_submitted_form', statusCode);
                        }
                    );
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_reply_show_form',
                function (e) {
                    console.log('.comment_reply_show_form');
                    $(".comment_form_holder",$(".comment_reply.comment_replying").removeClass("comment_replying")).remove();
                    var form_data = $(this).data();
                    var that = $(this);

                    if (that.closest('.comment_reply').hasClass('comment_replying')) {
                        return that;
                    }

                    that.attr("disabled",1);
                    FOS_COMMENT.get(
                        form_data.url,
                        {parentId: form_data.parentId},
                        function (data) {
                            that.removeAttr("disabled");
                            that.closest('.comment_reply').addClass('comment_replying');
                            that.after(data);
                            that.trigger('comment_show_form', data);
                        }
                    );
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_comment_reply_cancel',
                function (e) {
                    var form_holder = $(this).closest('.comment_form_holder');

                    var event = $.Event('comment_cancel_form');
                    form_holder.trigger(event);

                    if (event.isDefaultPrevented()) {
                        return;
                    }

                    form_holder.closest('.comment_reply').removeClass('comment_replying');
                    form_holder.remove();
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_comment_edit_show_form',
                function (e) {
                    var form_data = $(this).data();
                    var that = $(this);

                    FOS_COMMENT.get(
                        form_data.url,
                        {},
                        function (data) {
                            var commentBody = $(form_data.container);

                            // save the old comment for the cancel function
                            commentBody.data('original', commentBody.html());

                            // show the edit form
                            commentBody.html(data);

                            that.trigger('comment_show_edit_form', data);
                        }
                    );
                }
            );

            FOS_COMMENT.thread_container.on('submit',
                'form.comment_comment_edit_form',
                function (e) {
                    var that = $(this);
                    console.log('form.comment_comment_edit_form');
                    FOS_COMMENT.post(
                        this.action,
                        FOS_COMMENT.serializeObject(this),
                        // success
                        function (data) {
                            FOS_COMMENT.editComment(data);
                            that.trigger('comment_edit_comment', data);
                        },

                        // error
                        function (data, statusCode) {
                            var parent = that.parent();
                            parent.after(data);
                            parent.remove();
                        }
                    );

                    e.preventDefault();
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_comment_edit_cancel',
                function (e) {
                    FOS_COMMENT.cancelEditComment($(this).parents('.comment_comment_body'));
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_comment_vote',
                function (e) {
                    var that = $(this);
                    var form_data = that.data();

                    // Get the form
                    FOS_COMMENT.get(
                        form_data.url,
                        {},
                        function (data) {
                            // Post it
                            var form = $(data).children('form')[0];
                            var form_data = $(form).data();

                            FOS_COMMENT.post(
                                form.action,
                                FOS_COMMENT.serializeObject(form),
                                function (data) {
                                    $('#' + form_data.scoreHolder).html(data);
                                    that.trigger('comment_vote_comment', data, form);
                                }
                            );
                        }
                    );
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_comment_remove',
                function (e) {
                    var form_data = $(this).data();

                    var event = $.Event('comment_removing_comment');
                    $(this).trigger(event);

                    if (event.isDefaultPrevented()) {
                        return
                    }

                    // Get the form
                    FOS_COMMENT.get(
                        form_data.url,
                        {},
                        function (data) {
                            // Post it
                            var form = $(data).children('form')[0];

                            FOS_COMMENT.post(
                                form.action,
                                FOS_COMMENT.serializeObject(form),
                                function (data) {
                                    var commentHtml = $(data);

                                    var originalComment = $('#' + commentHtml.attr('id'));

                                    originalComment.replaceWith(commentHtml);
                                }
                            );
                        }
                    );
                }
            );

            FOS_COMMENT.thread_container.on('click',
                '.comment_thread_commentable_action',
                function (e) {
                    var form_data = $(this).data();

                    // Get the form
                    FOS_COMMENT.get(
                        form_data.url,
                        {},
                        function (data) {
                            // Post it
                            var form = $(data).children('form')[0];

                            FOS_COMMENT.post(
                                form.action,
                                FOS_COMMENT.serializeObject(form),
                                function (data) {
                                    var form = $(data).children('form')[0];
                                    var threadId = $(form).data().fosCommentThreadId;

                                    // reload the intire thread
                                    FOS_COMMENT.getThreadComments(threadId);
                                }
                            );
                        }
                    );
                }
            );
        },

        appendComment: function (commentHtml, form) {
            var form_data = form.data();

            if ('' != form_data.parent) {
                var form_parent = form.closest('.comment_comment_form_holder');

                // reply button holder
                var reply_button_holder = form.closest('.comment_comment_reply');

                var comment_element = form.closest('.comment_comment_show')
                    .children('.comment_comment_replies');

                reply_button_holder.removeClass('comment_replying');

                comment_element.prepend(commentHtml);
                comment_element.trigger('comment_add_comment', commentHtml);

                // Remove the form
                form_parent.remove();
            } else {
                // Insert the comment
                FOS_COMMENT.thread_container.children(".comment_thread_container").append(commentHtml);
                form.trigger('comment_add_comment', commentHtml);

                // "reset" the form
                form = $(form[0]);
                form[0].reset();
                form.children('.comment_form_errors').remove();
            }
        },

        editComment: function (commentHtml) {
            var commentHtml = $(commentHtml);
            var originalCommentBody = $('#' + commentHtml.attr('id')).children('.comment_comment_body');

            originalCommentBody.html(commentHtml.children('.comment_comment_body').html());
        },

        cancelEditComment: function (commentBody) {
            commentBody.html(commentBody.data('original'));
        },

        /**
         * easyXdm doesn't seem to pick up 'normal' serialized forms yet in the
         * data property, so use this for now.
         * http://stackoverflow.com/questions/1184624/serialize-form-to-json-with-jquery#1186309
         */
        serializeObject: function (obj) {
            var o = {};
            var a = $(obj).serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },

        loadCommentCounts: function () {
            var threadIds = [];
            var commentCountElements = $('span.fos-comment-count');

            commentCountElements.each(function (i, elem) {
                var threadId = $(elem).data('fosCommentThreadId');
                if (threadId) {
                    threadIds.push(threadId);
                }
            });

            FOS_COMMENT.get(
                FOS_COMMENT.base_url + '.json',
                {ids: threadIds},
                function (data) {
                    // easyXdm doesn't always serialize
                    if (typeof data != "object") {
                        data = jQuery.parseJSON(data);
                    }

                    var threadData = {};

                    for (var i in data.threads) {
                        threadData[data.threads[i].id] = data.threads[i];
                    }

                    $.each(commentCountElements, function () {
                        var threadId = $(this).data('fosCommentThreadId');
                        if (threadId) {
                            FOS_COMMENT.setCommentCount(this, threadData[threadId]);
                        }
                    });
                }
            );

        },

        setCommentCount: function (elem, threadObject) {
            if (threadObject == undefined) {
                elem.innerHTML = '0';

                return;
            }

            elem.innerHTML = threadObject.num_comments;
        }
    };

    // Check if a thread container was configured. If not, use default.
    FOS_COMMENT.thread_container = window.comment_thread_container || $('#comment_thread');

    // AJAX via easyXDM if this is configured
    if (typeof window.comment_remote_cors_url != "undefined") {
        /**
         * easyXDM instance to use
         */
        FOS_COMMENT.easyXDM = easyXDM.noConflict('FOS_COMMENT');

        /**
         * Shorcut request method.
         *
         * @param string method The request method to use.
         * @param string url The url of the page to request.
         * @param object data The data parameters.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        FOS_COMMENT.request = function (method, url, data, success, error) {
            // wrap the callbacks to match the callback parameters of jQuery
            var wrappedSuccessCallback = function (response) {
                if ('undefined' !== typeof success) {
                    success(response.data, response.status);
                }
            };
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.data.data, response.data.status);
                }
            };

            // todo: is there a better way to do this?
            FOS_COMMENT.xhr.request({
                url: url,
                method: method,
                data: data
            }, wrappedSuccessCallback, wrappedErrorCallback);
        };

        FOS_COMMENT.post = function (url, data, success, error) {
            this.request('POST', url, data, success, error);
        };

        FOS_COMMENT.get = function (url, data, success, error) {
            // make data serialization equals to that of jquery
            var params = jQuery.param(data);
            url += '' != params ? '?' + params : '';

            this.request('GET', url, undefined, success, error);
        };

        /* Initialize xhr object to do cross-domain requests. */
        FOS_COMMENT.xhr = new FOS_COMMENT.easyXDM.Rpc({
            remote: window.comment_remote_cors_url
        }, {
            remote: {
                request: {} // request is exposed by /cors/
            }
        });
    }

    // set the appropriate base url
    FOS_COMMENT.base_url = window.comment_thread_api_base_url;

    // Load the comment if there is a thread id defined.
    if (typeof window.comment_thread_id != "undefined") {
        // get the thread comments and init listeners
        FOS_COMMENT.getThreadComments(window.comment_thread_id);
    }

    if (typeof window.comment_thread_comment_count_callback != "undefined") {
        FOS_COMMENT.setCommentCount = window.comment_thread_comment_count_callback;
    }

    if ($('span.fos-comment-count').length > 0) {
        FOS_COMMENT.loadCommentCounts();
    }

    FOS_COMMENT.initializeListeners();

    window.fos = window.fos || {};
    window.fos.Comment = FOS_COMMENT;
})(window, window.jQuery, window.easyXDM);
