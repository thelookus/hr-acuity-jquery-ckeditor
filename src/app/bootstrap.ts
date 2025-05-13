import { Injector } from '../util/DependencyInjection/Injector';
import { BlogComponent } from './blog/BlogComponent';
import { BlogService } from './blog/BlogService';

export class App {
    blogComponent: BlogComponent;

    constructor() {
        // register components in app
        this.blogComponent = new BlogComponent(Injector.resolve<BlogService>(BlogService));
    }
}
