import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  reducePayload(payload: Record<string, any>): Record<string, any> | void {
    //examples:
    //  payload.value?.payload?.userId?.value
    //    => payload.userId
    //  payload.value?.payload?.customerUserEmail?.props?.email
    //    => payload.customerUserEmail.email
    //  payload.value?.payload?.customerUserEmail?.props?.email.value
    //    => payload.customerUserEmail.email

    if (payload?.value) {
      if (payload.value.payload) {
        if (typeof payload.value.payload !== 'object') {
          payload['value'] = payload.value.payload;

          return {
            type: 'object',
            properties: {
              value: { type: typeof payload.value.payload },
            },
          };
        } else {
          return this.reduceModel(payload, payload.value.payload);
        }
      }
    }
  }

  reduceModel(
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): Record<string, any> {
    const schema: Record<string, any> = {
      type: 'object',
      properties: {},
    };

    this.reduceModelOperation(schema, model, modelObject);

    return schema;
  }

  private reduceModelOperation(
    schema: Record<string, any>,
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): void {
    if (!modelObject) {
      modelObject = model;
    }

    for (const [property] of Object.entries(modelObject)) {
      schema.properties[property] = {};

      if (modelObject[property]?.value) {
        model[property] = modelObject[property].value;

        schema.properties[property]['type'] =
          typeof modelObject[property].value;
      } else {
        model[property] = {};

        schema.properties[property]['type'] = 'object';
        schema.properties[property]['properties'] = {};

        if (modelObject[property]?.props) {
          this.reduceModelOperation(
            schema.properties[property],
            model[property],
            modelObject[property].props,
          );
        } else if (
          typeof modelObject[property] === 'object' &&
          modelObject[property] !== null
        ) {
          this.reduceModelOperation(
            schema.properties[property],
            model[property],
            modelObject[property],
          );
        } else {
          model[property] = modelObject[property];

          schema.properties[property]['type'] = typeof modelObject[property];
          delete schema.properties[property].properties;
        }
      }
    }
  }
}
