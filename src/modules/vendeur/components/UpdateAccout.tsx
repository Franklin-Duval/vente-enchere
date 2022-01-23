/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { UserEntity } from '../../../entities/GestionCompte/user.entity';
import { PRIMARY } from '../../../shared/colors';
import { fetchOneVendeur } from '../../gerant/network/gerant.network';
import { update } from '../network';

export const UpdateAccout = () => {
  // const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    fetchOneVendeur(connectedUser._id).then((vendeur) => {
      if (vendeur.success) {
        setUser(vendeur.result.user);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => form.resetFields());

  const datainform = {
    nom: user?.nom,
    prenom: user?.prenom,
    email: user?.email,
    telephone: user?.telephone,
    ville: user?.localisation.ville,
    adresse: user?.localisation.adresse,
    pays: user?.localisation.pays,
  };

  return (
    <Form
      layout='vertical'
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={datainform}
      scrollToFirstError
      onFinish={async (data) => {
        setIsLoading(true);

        const dataToPost: any = {
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          email: data.email,

          roles: ['vendeur'],
          localisation: {
            adresse: data.adresse,
            ville: data.ville,
            pays: data.pays,
          },
        };

        await update(connectedUser._id, dataToPost)
          .then((data) => {
            if (data.success) {
              notification.success({
                message: 'Succes',
                description: data.message,
              });
            } else {
              notification.error({
                message: 'Erreur',
                description: data.message,
              });
            }
          })
          .catch((err) => console.log(err));
        setIsLoading(false);
        console.log(dataToPost);
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
        <Input />
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
        <Input />
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
        <Input />
      </Form.Item>

      <Form.Item
        label='Pays'
        name='pays'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre pays',
          },
        ]}
      >
        <Input />
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
        <Input />
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
        <Input />
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
        <Input />
      </Form.Item>

      {/* <Form.Item
        label='Pseudo'
        name='pseudo'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre pseudo',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Numero pour Transactions'
        name='momo'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre numero pour transactions',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Piece d\identification'
        name='cni'
        hasFeedback
        rules={[
          {
            required: true,
            message:
              "Veuillez renseigner votre numero de piece d'identification",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Specialite'
        name='Specialite'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre Specialite',
          },
        ]}
      >
        <Input />
      </Form.Item> */}

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
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};
