import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppTextInput } from "./AppTextInput";
import {
  validateEmail,
  validatePassword,
  validateNotEmpty,
} from "../helpers/validators";
const FIELD_TYPES = {
  EMAIL: "email",
  PASSWORD: "password",
  TEXT: "text",
};
const AppForm = ({
  fieldsProps,
  noEmptyValues,
  isLoading,
  submitButtonText,
  onSubmit,
}) => {
  const validateField = (value, fieldType) => {
    const fieldValidator = {
      [FIELD_TYPES.EMAIL]: validateEmail,
      [FIELD_TYPES.PASSWORD]: validatePassword,
      [FIELD_TYPES.TEXT]: validateNotEmpty,
    };
    return fieldValidator[fieldType](value);
  };

  const getInitialFieldsData = () => {
    const fieldsData = {};
    Object.values(fieldsProps).forEach((field) => {
      const validation =
        field.validate && field.initialValue
          ? validateField(field.initialValue, field.type)
          : undefined;
      const data = {
        value: field.initialValue || "",
        error: validation?.error,
        warning: validation?.warning,
        ...field,
      };
      fieldsData[field.id] = data;
    });
    return fieldsData;
  };

  const [fieldsData, setFieldsData] = useState(getInitialFieldsData);

  const onFieldUpdate = (value, fieldId) => {
    const copy = { ...fieldsData };
    const field = copy[fieldId];
    copy[fieldId].value = value;
    if (field.validate && field.liveValidation) {
      const validation = validateField(field.value, field.type);
      copy[fieldId].error = validation.error;
      copy[fieldId].warning = validation.warning;
    }
    setFieldsData(copy);
  };

  const onFieldBlur = (fieldId) => {
    const copy = { ...fieldsData };
    const field = copy[fieldId];
    if (field.validate) {
      const validation = validateField(field.value, field.type);
      copy[fieldId].error = validation?.error;
      copy[fieldId].warning = validation?.warning;
      setFieldsData(copy);
    }
  };

  const onSubmitForm = () => {
    const output = Object.values(fieldsData).reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {});
    onSubmit(output);
  };

  const fieldsArray = Object.values(fieldsData);
  const cantContinue = fieldsArray.filter((field) => {
    const isEmpty = validateNotEmpty(field.value);
    const unAcceptedError = field.error && field.validationRequired;
    return (noEmptyValues && isEmpty) || unAcceptedError;
  })?.length;

  return (
    <View style={styles.container}>
      {fieldsArray.map((field) => {
        return (
          <AppTextInput
            placeholder={field.placeHolder}
            key={field.id}
            error={field.error}
            warning={field.warning}
            secureTextEntry={field.secureText}
            onChangeText={(value) => onFieldUpdate(value, field.id)}
            defaultValue={field.initialValue}
            onBlur={() => {
              onFieldBlur(field.id);
            }}
          />
        );
      })}
      <AppButton
        containerStyle={styles.buttonContainer}
        onPress={() => {
          if (!isLoading) onSubmitForm();
        }}
        disabled={cantContinue}
        isLoading={isLoading}
        title={submitButtonText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 30,
    width: "90%",
  },
});
export { AppForm, FIELD_TYPES };
