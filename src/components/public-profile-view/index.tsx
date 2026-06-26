import { ProfileHeader } from "./-profile-header";
import { ProfileStats } from "./-profile-stats";
import { ProfileAchievements } from "./-profile-achievements";
import { ProfileActivity } from "./-profile-activity";

interface Props {
  username: string;
}

export const PublicProfileView = ({ username }: Props) => (
  <>
    <ProfileHeader username={username} />
    <ProfileStats username={username} />
    <ProfileAchievements username={username} />
    <ProfileActivity username={username} />
  </>
);
