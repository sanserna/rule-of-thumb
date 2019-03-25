import { model, Schema } from 'mongoose';

const voteItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    desc: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['other', 'entertainment', 'business', 'politics'],
      default: 'other'
    },
    meta: {
      positove_votes: Number,
      negative_votes: Number
    }
  },
  { timestamps: true }
);

export const VoteItem = model('voteItem', voteItemSchema);
