import { Label } from "@/components/ui/label"
import useDashboard from "../../../../hooks/useDashboard"
import { ProfileCard } from "./profile-card"
import { useTranslations } from "next-intl"

export default function ProfilesList() {
  const t = useTranslations('dashboard.profilesAndFiles')
  const {
    profiles,
    selectedProfile,
    setSelectedProfile,
    handleDeleteProfile,
    handleEditProfile
  } = useDashboard()

  return (
    <div className="space-y-3">
      <Label>{t('yourProfiles')}:</Label>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onDelete={handleDeleteProfile}
            onEdit={handleEditProfile}
            showBadge={profile.id === selectedProfile?.id}
            onClick={() => setSelectedProfile(profile)}
            badgeText={t("selected")}
          />
        ))}
      </div>
    </div>
  )
}
