export interface UserType {
  id: number;
  address: string;
  photo: string;
  name: string;
}

export interface UserSearch extends UserType {
  isFollowing: boolean,
}

export interface ProfileType extends UserType {
  banner: string,
  followers: number,
  following: number,
  isFollowing: boolean,
}

export interface CreatePostType {
  user: UserType;
  created_at: Date;
  text: string;
  id: number;
  isComment: boolean;

}

export interface PostType {
  id: number;
  isComment: boolean;
  text: string;
  created_at: Date;
  user: UserType;
  likes: number;
  comments: number;
  isLiked: boolean;
}
