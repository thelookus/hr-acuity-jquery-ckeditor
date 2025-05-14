import $ from 'jquery';
import { Helper } from '../../util/common';
import { BlogService } from './BlogService';
import { createRoot } from 'react-dom/client';
import CKEditorWrapper from './components/CKEditorWrapper';

export class BlogComponent {
    posts: Array<BlogPost>;
    private editorContent: string = '';

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

            const newPost = {
                title: $('#post-title').val() as string,
                author: $('#post-author').val() as string,
                content: this.editorContent
            };

            this.blogService.savePost(newPost);

            ($('#new-post-form form')[0] as HTMLFormElement).reset();
            this.editorContent = '';
            $('#new-post-form').hide();
            this.unmountEditor();

            this.loadPosts();
        });
    }

    private mountEditor() {
        const container = document.getElementById('editor-container');
        if (!container) return;

        const root = createRoot(container);
        root.render(
            <CKEditorWrapper
                value={this.editorContent}
                onChange={(data: string) => {
                    this.editorContent = data;
                }}
            />
        );
    }

    private unmountEditor() {
        const container = document.getElementById('editor-container');
        if (!container) return;

        const root = (container as any)._reactRoot;
        if (root) {
            root.unmount();
            (container as any)._reactRoot = null;
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