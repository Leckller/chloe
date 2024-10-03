import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserConnect from '../service/User-Connection.Service';
import { useAppSelector } from '../hooks/reduxHooks';
import Post from '../components/Post/Post';

function Profile() {
  const navigate = useNavigate();

  const { address } = useParams();

  const { token } = useAppSelector((s) => s.User);

  const [user, setUser] = useState({
    address: 'teste',
    banner: '',
    name: 'teste',
    photo: '',
    posts: [] as { id: number, text: string }[],
  });

  useEffect(() => {
    UserConnect.getUserByAddress(address || '', token).then((resp) => {
      if (!resp.ok) {
        navigate('notFound');
        alert('Usuário não encontado');
        return;
      }
      setUser(resp.result);
    });
  }, []);

  return (
    <div>

      <header>
        <button onClick={ () => navigate(-1) }>voltar</button>
      </header>

      <p className="flex gap-2 items-center">
        <strong className="text-lg">
          {user.name}
        </strong>
        {user.address}
      </p>

      {user.posts.map((post) => (
        <Post
          post={ {
            user: {
              address: user.address,
              id: 1,
              name: user.name,
              photo: user.photo,
            },
            likes: [],
            id: post.id,
            text: post.text,
          } }
          key={ post.id }
        />
      ))}

    </div>
  );
}

export default Profile;
