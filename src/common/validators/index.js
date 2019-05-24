export const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

export const required = (message = 'Required') => value =>
  value ? undefined : message;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
