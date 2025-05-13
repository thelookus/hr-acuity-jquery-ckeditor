import { Service } from "../../util/DependencyInjection/ServiceDecorator";
import { BlogPost } from './BlogComponent';

@Service()
export class BlogService {
    private readonly STORAGE_KEY = 'blog_posts';

    getPosts(): Array<BlogPost> {
        const posts = localStorage.getItem(this.STORAGE_KEY);
        const parsedPosts = posts ? JSON.parse(posts) : [];
        
        // Sort posts by date, newest first
        return parsedPosts.sort((a: BlogPost, b: BlogPost) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    savePost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
        const posts = this.getPosts();
        
        const newPost: BlogPost = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...post
        };

        posts.push(newPost);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
        
        return newPost;
    }
}
