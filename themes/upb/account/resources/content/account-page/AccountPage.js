function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "../../../../common/keycloak/web_modules/react.js";
import { ActionGroup, Button, Form, FormGroup, TextInput, InputGroup, Grid, GridItem, ExpandableSection, ValidatedOptions, PageSection, PageSectionVariants, Text, TextVariants, TextContent } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { AccountServiceContext } from "../../account-service/AccountServiceContext.js";
import { Msg } from "../../widgets/Msg.js";
import { ContentPage } from "../ContentPage.js";
import { ContentAlert } from "../ContentAlert.js";
import { LocaleSelector } from "../../widgets/LocaleSelectors.js";
import { KeycloakContext } from "../../keycloak-service/KeycloakContext.js";
import { AIACommand } from "../../util/AIACommand.js";
import { ExternalLinkSquareAltIcon } from "../../../../common/keycloak/web_modules/@patternfly/react-icons.js";

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
export class AccountPage extends React.Component {
  constructor(props, context) {
    super(props);

    _defineProperty(this, "context", void 0);
    _defineProperty(this, "DEFAULT_STATE", {
      errors: {
        username: '',
        firstName: '',
        lastName: '',
        email: ''
      },
      formFields: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        attributes: {}
      }
    });
    _defineProperty(this, "state", this.DEFAULT_STATE);

    this.context = context;
    this.fetchPersonalInfo();
  }

  fetchPersonalInfo() {
    this.context.doGet("/").then(response => {
      this.setState(this.DEFAULT_STATE);
      const formFields = response.data;

      if (!formFields.attributes) {
        formFields.attributes = {
          locale: [locale]
        };
      } else if (!formFields.attributes.locale) {
        formFields.attributes.locale = [locale];
      }

      this.setState({ ...{
          formFields: formFields
        }
      });
    });
  }

  render() {
    const fields = this.state.formFields;
    return /*#__PURE__*/React.createElement(ContentPage, {
      title: "personalInfoHtmlTitle",
      introMessage: "personalSubMessage"
    }, /*#__PURE__*/React.createElement(PageSection, {
      isFilled: true,
      variant: PageSectionVariants.light
    }, /*#__PURE__*/React.createElement(Form, {
      onSubmit: event => event.preventDefault(),
      className: "personal-info-form"
    }, /*#__PURE__*/React.createElement(FormGroup, {
      label: Msg.localize("username"),
      fieldId: "user-name",
      helperTextInvalid: this.state.errors.username,
      validated: this.state.errors.username !== "" ? ValidatedOptions.error : ValidatedOptions.default
    }, /*#__PURE__*/React.createElement(TextInput, {
      isReadOnly: true,
      type: "text",
      id: "user-name",
      name: "username",
      value: fields.username
    })), fields.email != undefined && /*#__PURE__*/React.createElement(FormGroup, {
      label: Msg.localize('email'),
      fieldId: "email-address",
      helperTextInvalid: this.state.errors.email,
      validated: this.state.errors.email !== "" ? ValidatedOptions.error : ValidatedOptions.default
    }, /*#__PURE__*/React.createElement(TextInput, {
      isReadOnly: true,
      type: "email",
      id: "email-address",
      name: "email",
      value: fields.email,
      validated: this.state.errors.email !== "" ? ValidatedOptions.error : ValidatedOptions.default
    })), fields.firstName != undefined && /*#__PURE__*/React.createElement(FormGroup, {
      label: Msg.localize("firstName"),
      fieldId: "first-name",
      helperTextInvalid: this.state.errors.firstName,
      validated: this.state.errors.firstName !== "" ? ValidatedOptions.error : ValidatedOptions.default
    }, /*#__PURE__*/React.createElement(TextInput, {
      isReadOnly: true,
      type: "text",
      id: "first-name",
      name: "firstName",
      value: fields.firstName,
      validated: this.state.errors.firstName !== "" ? ValidatedOptions.error : ValidatedOptions.default
    })), fields.lastName != undefined && /*#__PURE__*/React.createElement(FormGroup, {
      label: Msg.localize("lastName"),
      fieldId: "last-name",
      helperTextInvalid: this.state.errors.lastName,
      validated: this.state.errors.lastName !== "" ? ValidatedOptions.error : ValidatedOptions.default
    }, /*#__PURE__*/React.createElement(TextInput, {
      isReadOnly: true,
      type: "text",
      id: "last-name",
      name: "lastName",
      value: fields.lastName,
      validated: this.state.errors.lastName !== "" ? ValidatedOptions.error : ValidatedOptions.default
    })), features.isInternationalizationEnabled && /*#__PURE__*/React.createElement(FormGroup, {
      label: Msg.localize("selectLocale"),
      isRequired: true,
      fieldId: "locale"
    }, /*#__PURE__*/React.createElement(LocaleSelector, {
      id: "locale-selector",
      value: fields.attributes.locale || "",
      onChange: value => this.setState({
        errors: this.state.errors,
        formFields: { ...this.state.formFields,
          attributes: { ...this.state.formFields.attributes,
            locale: [value]
          }
        }
      })
    })))));
  }

}

_defineProperty(AccountPage, "contextType", AccountServiceContext);

;
