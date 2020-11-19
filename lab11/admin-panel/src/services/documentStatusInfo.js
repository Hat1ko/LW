import { statusInfo } from "@/config/documentStatusInfoConfig";

export const getDocumentStatusInfo = status =>
  statusInfo.find(s => s.status === status);
