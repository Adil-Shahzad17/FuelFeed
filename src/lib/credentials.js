const credentials = {
  end_point: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  database_id: String(import.meta.env.VITE_APPWRITE_DATABASE),
  collection_post: String(import.meta.env.VITE_APPWRITE_COLLECTION_POST),
  collection_user: String(import.meta.env.VITE_APPWRITE_COLLECTION_USER),
  collection_reactions: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_REACTIONS
  ),
  collection_saves: String(import.meta.env.VITE_APPWRITE_COLLECTION_SAVES),
  bucket_post: String(import.meta.env.VITE_APPWRITE_BUCKET_POST),
  bucket_user: String(import.meta.env.VITE_APPWRITE_BUCKET_USER),
};

export default credentials;

console.log(credentials);
