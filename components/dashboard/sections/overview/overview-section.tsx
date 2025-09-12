import useDashboard from "../../context/useDashboard"

export default function OverviewSection() {
  const { user } = useDashboard()

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2>Hi {user.user_metadata.name}!</h2>
      </div>
    </div>
  )
}