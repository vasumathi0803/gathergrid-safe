import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/settings')({head:()=>routeHead('Operations Settings','Manage your CrowdSafe demo session, export local reports, and review simulation safety information.'),component:SettingsPage});
