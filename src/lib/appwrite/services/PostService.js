import credentials from "@/lib/credentials";
import { Client, ID, Databases, Storage } from "appwrite";

class PostService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(credentials.end_point)
      .setProject(credentials.project_id);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    category,
    content,
    post_img,
    user_id,
    profile_img,
    user_name,
    likes_count,
  }) {
    try {
      return await this.database.createDocument(
        credentials.database_db,
        credentials.collection_post,
        ID.unique(),
        {
          category,
          content,
          post_img,
          user_id,
          profile_img,
          user_name,
          likes_count,
        }
      );
    } catch (error) {
      console.log("Create Post Error", error);
      return false;
    }
  }

  async updatePost(
    post_id,
    { category, content, post_img, user_id, likes_count }
  ) {
    try {
      return await this.database.updateDocument(
        credentials.database_db,
        credentials.collection_post,
        post_id,
        {
          category,
          content,
          post_img,
          user_id,
          likes_count,
        }
      );
    } catch (error) {
      console.log("Update Post Error", error);
      return false;
    }
  }

  async deletePost(post_id) {
    try {
      await this.database.deleteDocument(
        credentials.database_db,
        credentials.collection_post,
        post_id
      );
      return true;
    } catch (error) {
      console.log("Delete Post Error", error);
      return false;
    }
  }

  async getPost({ post_id }) {
    try {
      return await this.database.getDocument(
        credentials.database_db,
        credentials.collection_post,
        post_id
      );
    } catch (error) {
      console.log("Get Post Error", error);
      return false;
    }
  }

  async allPosts(queries = []) {
    try {
      return await this.database.listDocuments(
        credentials.database_db,
        credentials.collection_post,
        queries
      );
    } catch (error) {
      console.log("All Post Error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        credentials.bucket_fuel,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Create | Upload File Error", error);
      return false;
    }
  }

  async deleteFile(file_id) {
    try {
      await this.bucket.deleteFile(credentials.bucket_fuel, file_id);
      return true;
    } catch (error) {
      console.log("Delete File Error", error);
      return false;
    }
  }

  getFilePreview(file_id) {
    // return this.bucket.getFilePreview(credentials.bucket_fuel, file_id);
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${credentials.bucket_fuel}/files/${file_id}/view?project=${credentials.project_id}`;

    return fileUrl;
  }
}

const post_service = new PostService();

export default post_service;
