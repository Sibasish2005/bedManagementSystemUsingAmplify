import { a, defineData, type ClientSchema } from '@aws-amplify/backend';


const schema = a.schema({
  Bed: a
    .model({
      bedNumber: a.string().required(),
      roomNumber: a.string().required(),
      roomtype: a.string().required(),
      isOccupied: a.boolean().default(false),
      assignedPatientId: a.id(),
      assignedDoctorId: a.id(),
      admittedAt: a.datetime(),
      dischargedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});

