export interface IUser {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
}
export interface IPost {
    _id: string;
    title: string;
    summary: string;
    category: string;
    content: string;
    author: IUser;
    likes: string[];
    createdAt: string;
}
export type LoginType = Pick<IUser, "email"> & { password: string };
export type RegisterType = Omit<IUser, "_id"> & { password: string };
export type CreatePostType = Pick<
    IPost,
    "title" | "summary" | "content" | "category"
>;
