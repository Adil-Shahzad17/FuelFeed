import { Client, ID, Databases, Storage } from "appwrite";
import credentials from "@/lib/credentials";

class UserService {
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

  async createUser({
    user_id,
    user_name,
    bio,
    cover_img,
    profile_img,
    lastSessionTime,
  }) {
    try {
      return await this.database.createDocument(
        credentials.database_db,
        credentials.collection_user,
        user_id,
        {
          user_name,
          bio,
          cover_img,
          profile_img,
          lastSessionTime,
        }
      );
    } catch (error) {
      console.log("Create User Profile Error", error);
      return false;
    }
  }

  async updateUser({ user_id, bio, cover_img, profile_img, lastSessionTime }) {
    try {
      return await this.database.updateDocument(
        credentials.database_db,
        credentials.collection_user,
        user_id,
        {
          bio,
          cover_img,
          profile_img,
          lastSessionTime,
        }
      );
    } catch (error) {
      console.log("Update Profile Error", error);
      return false;
    }
  }

  async getUser({ user_id }) {
    try {
      return await this.database.getDocument(
        credentials.database_db,
        credentials.collection_user,
        user_id
      );
    } catch (error) {
      console.log("Get Profile Error", error);
      return false;
    }
  }

  async allUsers(queries = []) {
    try {
      return await this.database.listDocuments(
        credentials.database_db,
        credentials.collection_user,
        queries
      );
    } catch (error) {
      console.log("All Post Error", error);
      return false;
    }
  }

  async uploadUserFile(file) {
    try {
      return await this.bucket.createFile(
        credentials.bucket_fuel,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Create | Upload Profile File Error", error);
      return false;
    }
  }

  async deleteUserFile(file_id) {
    try {
      await this.bucket.deleteFile(credentials.bucket_fuel, file_id);
      return true;
    } catch (error) {
      console.log("Delete Profile File Error", error);
      return false;
    }
  }

  getUserFilePreview(file_id) {
    // const image = this.bucket.getFileDownload(credentials.bucket_fuel, file_id);

    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${credentials.bucket_fuel}/files/${file_id}/view?project=${credentials.project_id}`;

    return fileUrl;
  }
}

const userService = new UserService();

export default userService;
