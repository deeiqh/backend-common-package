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
        payload['value'] = propertyFactory(typeof payload.value.payload);

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
  const sample: Record<string, any> = { value: 'some-any' };

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
    if (modelObject[property]?.value) {
      model[property] = modelObject[property].value;

      sample[property] = propertyFactory(typeof modelObject[property].value);
    } else {
      if (modelObject[property]?.props) {
        if (
          Object.keys(modelObject[property].props).length === 1 &&
          Object.keys(modelObject[property].props)[0] === 'value'
        ) {
          model[property] = modelObject[property].props.value;

          sample[property] = propertyFactory(
            typeof modelObject[property].props.value,
          );
        } else {
          model[property] = {};

          sample[property] = {};

          reduceModelOperation(
            sample[property],
            model[property],
            modelObject[property].props,
          );
        }
      } else if (
        typeof modelObject[property] === 'object' &&
        modelObject[property] !== null
      ) {
        reduceModelOperation(
          sample[property],
          model[property],
          modelObject[property],
        );
      } else {
        model[property] = modelObject[property];

        sample[property] = propertyFactory(typeof modelObject[property]);
      }
    }
  }
}
