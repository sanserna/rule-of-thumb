import { User } from './user.model';

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password')
      .lean()
      .exec();

    if (!user) {
      return res.sendStatus(400);
    }

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};
