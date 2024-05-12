"use client";

import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormInput,
  Grid,
  Message,
} from "semantic-ui-react";
import { InputFile } from "semantic-ui-react-input-file";
import { Context } from "../layout";
import { observer } from "mobx-react-lite";

function registration() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {store} = useContext(Context);

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "100%" }}>
        <Container>
          <h2>Регистрация</h2>
          <Form unstackable>
            <FormInput label="Логин" placeholder="Логин" onChange={(e) => {
              setLogin(e.target.value)
            }} />
            <FormInput label="Почта" placeholder="Почта" onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <FormInput label="Пароль" placeholder="пароль" type="password" onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <Button
              style={{ display: "block", marginTop: "1rem" }}
              type="submit"
              onClick={() => {
                store.registration(login, email, password)
              }}
            >
              Создать
            </Button>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default observer(registration)
