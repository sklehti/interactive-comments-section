import express from "express";
import usersCommentsService from "../services/usersCommentsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(usersCommentsService.getEntries());
});

router.get("/:username", (req, res) => {
  const rightUser = usersCommentsService.findByUsername(req.params.username);

  if (rightUser) {
    res.send(rightUser);
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (_req, res) => {
  res.send("Saving a data");
});

export default router;
