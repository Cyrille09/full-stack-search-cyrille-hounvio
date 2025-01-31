import { Response } from "express";
import { ERROR_MESSAGES } from "../constants/defaultValues";

export function handle400Error(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(400).send({ error: ERROR_MESSAGES.UNKNOWN_ERROR });
  }
}

export function handle500Error(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(500).send({ error: error.message });
  } else {
    res.status(500).send({ error: ERROR_MESSAGES.UNKNOWN_ERROR });
  }
}
