import $ from 'jquery';
import { Helper } from '../../util/common';
import { BlogService } from './BlogService';
import { createRoot } from 'react-dom/client';
import CKEditorWrapper from './components/CKEditorWrapper';

export class BlogComponent {
    posts: Array<BlogPost>;
    private editorContent: string = '';
    private editorRoot: any = null;

    // dependency injection
    constructor(private blogService: BlogService) {
        this.posts = [];
        this.loadPosts();
        this.handleButtonClick();
    }

    loadPosts(): void {
        try {
            this.posts = this.blogService.getPosts();
            this.renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
            $('#blog-posts').html('<p class="error">Error loading posts. Please try again.</p>');
        }
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
                        <div id="editor-container"></div>
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
            this.mountEditor();
        });

        $(document).on('click', '#cancel-post', (): void => {
            $('#new-post-form').hide();
            this.editorContent = '';
            this.unmountEditor();
        });

        $(document).on('submit', '#new-post-form form', (e: JQuery.Event): void => {
            e.preventDefault();

            try {
                const title = $('#post-title').val() as string;
                const author = $('#post-author').val() as string;

                if (!title || !author || !this.editorContent) {
                    throw new Error('All fields are required');
                }

                const newPost = {
                    title,
                    author,
                    content: this.editorContent
                };

                this.blogService.savePost(newPost);

                ($('#new-post-form form')[0] as HTMLFormElement).reset();
                this.editorContent = '';
                $('#new-post-form').hide();
                this.unmountEditor();

                this.loadPosts();
            } catch (error) {
                console.error('Error saving post:', error);
                alert('Error saving post. Please try again.');
            }
        });
    }

    private mountEditor() {
        const container = document.getElementById('editor-container');
        if (!container) return;

        try {
            this.editorRoot = createRoot(container);
            this.editorRoot.render(
                <CKEditorWrapper
                    value={this.editorContent}
                    onChange={(data: string) => {
                        this.editorContent = data;
                    }}
                />
            );
        } catch (error) {
            console.error('Error mounting editor:', error);
            container.innerHTML = '<p class="error">Error loading editor. Please try again.</p>';
        }
    }

    private unmountEditor() {
        if (this.editorRoot) {
            try {
                this.editorRoot.unmount();
                this.editorRoot = null;
            } catch (error) {
                console.error('Error unmounting editor:', error);
            }
        }
    }
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
}