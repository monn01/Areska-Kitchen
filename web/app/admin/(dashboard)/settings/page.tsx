import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsAdminPage() {
  let settings = await prisma.appSetting.findFirst();
  if (!settings) {
    settings = await prisma.appSetting.create({ data: {} });
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Pengaturan</h1>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
