import { Post } from './post';

describe('Post', () => {
  it('should create an instance', () => {
    const directive = new Post();
    expect(directive).toBeTruthy();
  });
});
