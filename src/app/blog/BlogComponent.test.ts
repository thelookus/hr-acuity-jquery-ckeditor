import { describe, it, expect, beforeEach } from 'vitest';
import { BlogComponent } from './BlogComponent';
import { BlogService } from './BlogService';

describe('BlogComponent', () => {
    let blogComponent: BlogComponent;
    let blogService: BlogService;
    let mockLocalStorage: { [key: string]: string };

    beforeEach(() => {
        mockLocalStorage = {};
        global.localStorage = {
            getItem: (key: string) => mockLocalStorage[key] || null,
            setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
            clear: () => { mockLocalStorage = {}; },
            removeItem: (key: string) => { delete mockLocalStorage[key]; },
            length: 0,
            key: (index: number) => Object.keys(mockLocalStorage)[index] || null
        };

        blogService = new BlogService();
        blogComponent = new BlogComponent(blogService);
    });

    it('should save and retrieve post content correctly', () => {
        const testPost = {
            title: 'Test Post',
            author: 'Test Author',
            content: '<p>Test content with <strong>bold</strong> and <em>italic</em> text</p>'
        };

        blogService.savePost(testPost);
        const retrievedPosts = blogService.getPosts();

        expect(retrievedPosts).toHaveLength(1);
        expect(retrievedPosts[0].content).toBe(testPost.content);
        expect(retrievedPosts[0].title).toBe(testPost.title);
        expect(retrievedPosts[0].author).toBe(testPost.author);
    });
});