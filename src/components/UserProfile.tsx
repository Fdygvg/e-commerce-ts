import { useUser } from '../hooks/useUser';
import styles from '../styles/UserProfile.module.css';

export default function UserProfile() {
    const { user, isLoggedIn } = useUser();

    if (!user) {
        return null;
    }

    return (
        <div className={styles.profileCard}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <div className={styles.profileInfo}>
                <h3>{user.name}</h3>
                <p>📧 {user.email}</p>
                <p>📍 {user.address}</p>
                <div className={styles.profileStatus}>
                    <span className={`${styles.statusDot} ${isLoggedIn ? styles.online : styles.offline}`} />
                    {isLoggedIn ? 'Online' : 'Offline'}
                </div>
            </div>
        </div>
    );
}
