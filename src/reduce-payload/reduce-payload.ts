import { propertyFactory } from './property.factory';

export function reducePayload(
  payload: Record<string, any>,
): Record<string, any> | void {
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
          value: propertyFactory(typeof payload.value.payload),
        };
      } else {
        return reduceModel(payload, payload.value.payload);
      }
    }
  }
}

export function reduceModel(
  model: Record<string, any>,
  modelObject?: Record<string, any>,
): Record<string, any> {
  const sample: Record<string, any> = { value: 'uuid-123-some-any-abc-uuid' };

  reduceModelOperation(sample, model, modelObject);

  return sample;
}

function reduceModelOperation(
  sample: Record<string, any>,
  model: Record<string, any>,
  modelObject?: Record<string, any>,
): void {
  if (!modelObject) {
    modelObject = model;
  }

  for (const [property] of Object.entries(modelObject)) {
    // schema.properties[property] = {};

    if (modelObject[property]?.value) {
      model[property] = modelObject[property].value;

      // schema.properties[property]['type'] = typeof modelObject[property].value;
      sample[property] = propertyFactory(modelObject[property].value);
    } else {
      model[property] = {};

      // schema.properties[property]['type'] = 'object';
      // schema.properties[property]['properties'] = {};
      sample[property] = {};

      if (modelObject[property]?.props) {
        reduceModelOperation(
          // schema.properties[property],
          sample[property],
          model[property],
          modelObject[property].props,
        );
      } else if (
        typeof modelObject[property] === 'object' &&
        modelObject[property] !== null
      ) {
        reduceModelOperation(
          // schema.properties[property],
          sample[property],
          model[property],
          modelObject[property],
        );
      } else {
        model[property] = modelObject[property];

        // schema.properties[property]['type'] = typeof modelObject[property];
        sample[property] = propertyFactory(typeof modelObject[property]);
        // delete schema.properties[property].properties;
      }
    }
  }
}
