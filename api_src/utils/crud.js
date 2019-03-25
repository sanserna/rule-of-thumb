export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findById(req.params.id)
      .lean()
      .exec();

    if (!doc) {
      return res.sendStatus(400);
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.sendtStatus(400);
  }
};

export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.sendtStatus(400);
  }
};

export const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.sendtStatus(400);
  }
};

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.sendtStatus(400);
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.sendtStatus(400);
  }
};

export const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findByIdAndRemove(req.params.id);

    if (!removed) {
      return res.sendtStatus(400);
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.sendtStatus(400);
  }
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});
