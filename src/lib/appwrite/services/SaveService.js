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

  async createPost(data) {
    try {
      return await this.database.createDocument(
        credentials.database_db,
        credentials.collection_saves,
        ID.unique(),
        {
          data,
        }
      );
    } catch (error) {
      console.log("Save Post Error", error);
      return false;
    }
  }

  async getAllSavedPosts({ user_id }) {
    try {
      return await this.database.listDocuments(
        credentials.database_db,
        credentials.collection_saves,
        [Query.equal("user_id", user_id)]
      );
    } catch (error) {
      console.log("All Post Error", error);
      return false;
    }
  }

  //   async deleteSave({ user_id }) {
  //     try {
  //       return await this.database.getDocument(
  //         credentials.database_db,
  //         credentials.collection_saves,
  //         post_id
  //       );
  //     } catch (error) {
  //       console.log("Get Post Error", error);
  //       return false;
  //     }
  //   }
}

const saveService = new SaveService();

export default saveService;
