import { IVideo } from "./../src/models/Video";
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

export type VideoFormData = Omit<IVideo, "_id">;

class ApiClient {
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`
      );
    }
    return response.json();
  }

  async getVideos() {
    return this.fetch("/videos");
  }
  async createVideo(videoData: IVideo) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
