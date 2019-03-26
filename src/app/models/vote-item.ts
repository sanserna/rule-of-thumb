export interface VoteItem {
  _id: string;
  name: string;
  desc: string;
  category: string;
  link?: string;
  meta: {
    positive_votes: number;
    negative_votes: number;
  };
}
