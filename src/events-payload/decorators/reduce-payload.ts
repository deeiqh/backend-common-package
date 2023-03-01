export function reducePayload(
  payload: Record<string, any>,
): Record<string, any> | void {
  if (payload?.value) {
    if (payload.value.payload) {
      if (typeof payload.value.payload !== 'object') {
        payload['value'] = payload.value.payload;
      } else {
        reduceModel(payload, payload.value.payload);
      }
    }
  }
}

export function reduceModel(
  model: Record<string, any>,
  modelObject?: Record<string, any>,
): void {
  reduceModelOperation(model, modelObject);
}

function reduceModelOperation(
  model: Record<string, any>,
  modelObject?: Record<string, any>,
): void {
  if (!modelObject) {
    modelObject = model;
  }

  for (const [property] of Object.entries(modelObject)) {
    if (modelObject[property]?.value) {
      model[property] = modelObject[property].value;
    } else {
      if (modelObject[property]?.props) {
        if (Object.keys(modelObject[property].props).length === 1) {
          model[property] = Object.entries(modelObject[property].props)[0][1];
        } else {
          model[property] = {};
          reduceModelOperation(model[property], modelObject[property].props);
        }
      } else if (
        typeof modelObject[property] === 'object' &&
        modelObject[property] !== null
      ) {
        reduceModelOperation(model[property], modelObject[property]);
      } else {
        model[property] = modelObject[property];
      }
    }
  }
}
