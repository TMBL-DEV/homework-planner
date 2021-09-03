<?php

namespace App\Traits;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\DB;

trait hasSchoolClass
{
    use \Laravel\Jetstream\HasTeams;

    public function switchClass(int $teamId, int $uid, ?string $role = 'student'): bool
    {
        $team = Team::find($teamId);

        $teamUsersQuery = DB::table('team_user');

        $teamUser = $teamUsersQuery->where('team_id', $teamId)->where('user_id', $uid)->get()->first();
        $body = [
            'team_id' => $teamId,
            'user_id' => $uid,
            'role' => $role
        ];
        if (!$teamUser) {
            $teamUsersQuery->insert($body);
        }

        $teamUsersQuery->where('team_id', $teamId)->where('user_id', $uid)->update($body);
        $this->switchTeam($team);

        return true;
    }

    public function isStudent(User $user): bool
    {
        return (bool)DB::table('team_user')->where('team_id', $user->currentTeam->id)->where('user_id', $user->id)->where('role', 'student')->get()->first();
    }
}
