-- A proctored quiz needs a live camera; losing it counts, and the on-device face checks are noted.
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'CAMERA_LOST';
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'NO_FACE';
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'MULTIPLE_FACES';
