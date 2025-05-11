import { Client, ID, Databases, Storage } from "appwrite";
import credentials from "@/lib/credentials";

class SaveService {
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

  async savePost({
    user_id,
    post_id,
    content,
    category,
    post_img,
    profile_img,
    user_name,
  }) {
    try {
      return await this.database.createDocument(
        credentials.database_db,
        credentials.collection_saves,
        ID.unique(),
        {
          user_id,
          post_id,
          content,
          category,
          post_img,
          profile_img,
          user_name,
        }
      );
    } catch (error) {
      console.log("Save Post Error", error);
      return false;
    }
  }

  async getAllSavedPosts(queries = []) {
    try {
      return await this.database.listDocuments(
        credentials.database_db,
        credentials.collection_saves,
        queries
      );
    } catch (error) {
      console.log("All Post Error", error);
      return false;
    }
  }

  async deleteSavePost(save_id) {
    try {
      await this.database.deleteDocument(
        credentials.database_db,
        credentials.collection_saves,
        save_id
      );
      return true;
    } catch (error) {
      console.log("Delete Post Error", error);
      return false;
    }
  }
}

const saveService = new SaveService();

export default saveService;
