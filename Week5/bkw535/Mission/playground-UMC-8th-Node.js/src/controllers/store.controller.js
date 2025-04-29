import { StatusCodes } from "http-status-codes";
import {bodyToStore} from "../dtos/store.dto.js";
import {addStore as addStoreService } from "../services/store.service.js";

export const addStore = (req, res) => {
    res.send("Store added!");
  };