/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createUser } from '../../../redux/userStore/actions';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { signUp } from '../network';

export const RegistrationForm = ({ isClient }: { isClient: boolean }) => {
  const router = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout='vertical'
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data) => {
        setIsLoading(true);
        let dataToPost: any = {
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          email: data.email,
          password: data.password,
          roles: [],
          localisation: {
            adresse: data.adresse,
            ville: data.ville,
            pays: 'Cameroun',
          },
        };

        if (isClient) {
          dataToPost.roles = ['client'];
          await signUp('client', dataToPost)
            .then((data) => {
              if (data.success) {
                notification.success({
                  message: 'Succès',
                  description: data.message,
                });
                const clientId = data.result._id;
                dispatch(
                  createUser({
                    authentifie: true,
                    roles: data.result.roles,
                    _id: data.result._id,
                    nom: data.result.nom,
                    prenom: data.result.prenom,
                    token: data.result.token,
                    nextAuthDate: new Date().getTime() + 23.9 * 60 * 60 * 1000,
                  }),
                );
                router.push(ROUTES.ACTIVATE_ACCOUNT(clientId));
              } else {
                notification.error({
                  message: 'Erreur',
                  description: data.message,
                });
              }
            })
            .catch((error) => {
              notification.error({
                message: 'Erreur',
                description: 'une erreur est survenu',
              });
            });
        } else {
          dataToPost.roles = ['vendeur'];
          dataToPost.specialite = data.specialite;
          dataToPost.numeroCNI = data.numeroCNI;
          await signUp('vendeur', dataToPost)
            .then((data) => {
              if (data.success) {
                notification.success({
                  message: 'Succès',
                  description: data.message,
                });
                const vendeurId = data.result._id;
                dispatch(
                  createUser({
                    authentifie: true,
                    roles: data.result.roles,
                    _id: data.result._id,
                    nom: data.result.nom,
                    prenom: data.result.prenom,
                    token: data.result.token,
                    nextAuthDate: new Date().getTime() + 23.9 * 60 * 60 * 1000,
                  }),
                );
                router.push(ROUTES.ACTIVATE_ACCOUNT(vendeurId));
              } else {
                notification.error({
                  message: 'Erreur',
                  description: data.message,
                });
              }
            })
            .catch((error) => {
              notification.error({
                message: 'Erreur',
                description: 'une erreur est survenu',
              });
            });
        }
        setIsLoading(false);
      }}
    >
      <Form.Item
        label='Nom'
        name='nom'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre nom',
          },
        ]}
      >
        <Input placeholder='nom' />
      </Form.Item>

      <Form.Item
        label='Prénom'
        name='prenom'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre prénom',
          },
        ]}
      >
        <Input placeholder='prénom' />
      </Form.Item>

      <Form.Item
        label='Adresse mail'
        name='email'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre mail',
          },
          {
            type: 'email',
            message: "Le format de l'email n'est pas respecté",
          },
        ]}
      >
        <Input placeholder='email' />
      </Form.Item>

      <Form.Item
        label='Téléphone'
        name='telephone'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre contact téléhonique',
          },
        ]}
      >
        <Input placeholder='telephone' />
      </Form.Item>

      <Form.Item
        label='Adresse'
        name='adresse'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre adresse',
          },
        ]}
      >
        <Input placeholder='adresse' />
      </Form.Item>

      <Form.Item
        label='Ville'
        name='ville'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre ville',
          },
        ]}
      >
        <Input placeholder='ville' />
      </Form.Item>

      {!isClient && (
        <>
          <Form.Item
            label='Numéro CNI'
            name='numeroCNI'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Veuillez renseigner votre numéro de CNI',
              },
            ]}
          >
            <Input placeholder='numéro de cni' />
          </Form.Item>

          <Form.Item
            label='Spécialité'
            name='specialite'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Veuillez renseigner votre spécialité',
              },
            ]}
          >
            <Input placeholder='spécialité' />
          </Form.Item>
        </>
      )}

      <Form.Item
        label='Password'
        name='password'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre mot de passe',
          },
        ]}
      >
        <Input.Password placeholder='password' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          size='large'
          style={{
            width: '100%',
            backgroundColor: PRIMARY,
            borderColor: 'transparent',
          }}
        >
          Créer son compte
        </Button>
      </Form.Item>
    </Form>
  );
};
