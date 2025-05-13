import $ from 'jquery';
import { Helper } from '../../util/common';
import { BlogService } from './BlogService';

export class BlogComponent {
    posts: Array<BlogPost>;
    
    // dependency injection
    constructor(private blogService: BlogService) {
        this.posts = [];
        this.loadPosts();
        this.handleButtonClick();
    }

    loadPosts(): void {
        this.posts = this.blogService.getPosts();
        this.renderPosts();
    }

    renderPosts(): void {
        const postContainer = $('#blog-posts');
        postContainer.empty();
        
        // Add the new post form (initially hidden)
        const formHtml = `
            <div id="new-post-form" style="display: none;">
                <h3>Create New Post</h3>
                <form>
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input type="text" id="post-title" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="author">Author:</label>
                        <input type="text" id="post-author" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="editor">Content:</label>
                        <div class="btn-toolbar" role="toolbar" aria-label="Editor toolbar">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" data-role="bold" title="Bold (Ctrl/Cmd+B)">
                                    <i class="fa fa-bold"></i>
                                </button>
                                <button type="button" class="btn btn-default" data-role="italic" title="Italic (Ctrl/Cmd+I)">
                                    <i class="fa fa-italic"></i>
                                </button>
                                <button type="button" class="btn btn-default" data-role="underline" title="Underline (Ctrl/Cmd+U)">
                                    <i class="fa fa-underline"></i>
                                </button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" data-role="insertunorderedlist" title="Bullet list">
                                    <i class="fa fa-list-ul"></i>
                                </button>
                                <button type="button" class="btn btn-default" data-role="insertorderedlist" title="Number list">
                                    <i class="fa fa-list-ol"></i>
                                </button>
                            </div>
                        </div>
                        <div id="editor" class="form-control" contenteditable="true" style="height: 200px; overflow-y: auto;"></div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="button" id="cancel-post" class="btn btn-default">Cancel</button>
                </form>
            </div>
        `;
        postContainer.before(formHtml);

        if (Array.isArray(this.posts) && this.posts.length > 0) {
            this.posts.forEach(post => {
                const postElement = `
                    <article class="blog-post">
                        <h2>${Helper.escapeHtml(post.title)}</h2>
                        <div class="metadata">
                            <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                            <span class="author">By ${Helper.escapeHtml(post.author)}</span>
                        </div>
                        <div class="content">${post.content}</div>
                    </article>
                `;
                postContainer.append(postElement);
            });
        } else {
            postContainer.append('<p>No posts yet!</p>');
        }
    }
    
    handleButtonClick = () => {
        $('#refresh').on('click', (): void => {
            this.loadPosts();
        });

        $('#new-post').on('click', (): void => {
            $('#new-post-form').show();
            
            const editor = $('#editor');
            
            // Handle toolbar button clicks
            $('.btn-toolbar button').on('click', function() {
                const command = $(this).data('role');
                document.execCommand(command, false, null);
                editor.focus();
            });

            // Set initial focus to the editor
            editor.focus();
        });

        $(document).on('click', '#cancel-post', (): void => {
            $('#new-post-form').hide();
            // Clear editor content when canceling
            $('#editor').html('');
        });

        $(document).on('submit', '#new-post-form form', (e: JQuery.Event): void => {
            e.preventDefault();
            
            const newPost = {
                title: $('#post-title').val() as string,
                author: $('#post-author').val() as string,
                content: $('#editor').html()
            };

            this.blogService.savePost(newPost);
            
            ($('#new-post-form form')[0] as HTMLFormElement).reset();
            $('#editor').html('');
            $('#new-post-form').hide();
            
            this.loadPosts();
        });
    }
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
}