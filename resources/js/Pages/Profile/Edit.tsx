import ManageLayout from '@/Layouts/ManagementLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Edit({
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <ManageLayout
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <p className='mb-5 text-2xl'>Log Out</p>
                        <div className="text-red-600">
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>

                </div>
            </div>
        </ManageLayout>
    );
}
