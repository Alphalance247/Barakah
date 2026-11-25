export type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export interface CreatorSource {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  isVerified: boolean;
  bio?: string;
}

export interface ClipItem {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  topicId: string;
  topicName: string;
  creator: CreatorSource;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  allowDownload: boolean;
  commentsEnabled: boolean;
  createdAt: string;
}

export interface CommentEntry {
  id: string;
  clipId: string;
  authorName: string;
  authorAvatarUrl?: string;
  isVerifiedCreator?: boolean;
  isPinned?: boolean;
  text: string;
  likesCount: number;
  createdAt: string;
  replies?: CommentEntry[];
}

export interface SavedCollection {
  id: string;
  name: string;
  clipCount: number;
  previewThumbnails: string[];
}

export interface DownloadedClip {
  id: string;
  clipId: string;
  title: string;
  creatorName: string;
  thumbnailUrl?: string;
  downloadedAt: string;
}

export interface ContentSubmission {
  id: string;
  title: string;
  sourceUrlOrFile: string;
  speakerOrSource: string;
  topicId: string;
  note?: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  submittedAt: string;
}
