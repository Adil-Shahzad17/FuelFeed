// Imported from ENV
const credentials = {
  end_point: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  database_db: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collection_post: String(import.meta.env.VITE_APPWRITE_COLLECTION_POST),
  collection_user: String(import.meta.env.VITE_APPWRITE_COLLECTION_USER),
  collection_saves: String(import.meta.env.VITE_APPWRITE_COLLECTION_SAVES),
  bucket_fuel: String(import.meta.env.VITE_APPWRITE_BUCKET_FUEL),
  EMAIL_JS_SERVICE_ID: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID: import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
  EMAIL_JS_PUBLIC_KEY: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
};
export default credentials;
