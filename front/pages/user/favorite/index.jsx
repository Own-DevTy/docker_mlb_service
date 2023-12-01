import { UseAuth } from '@/hooks/useAuth';

export default function UserFavorite({ user, props }) {
    return <div></div>;
}

export async function getServerSideProps(context) {
    const props = {};
    return UseAuth(context, props);
}
