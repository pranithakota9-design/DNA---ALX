"""
DNA-ALX Role-Based Access Control (RBAC)
Defines permissions for ADMIN, RESEARCHER, and VIEWER roles.
"""

ROLES = {
    "ADMIN": {
        "can_view_audit_logs": True,
        "can_manage_users": True,
        "can_upload_dna": True,
        "can_analyze_dna": True,
        "can_run_ml": True,
        "can_generate_reports": True,
        "can_view_samples": True
    },
    "RESEARCHER": {
        "can_view_audit_logs": False,
        "can_manage_users": False,
        "can_upload_dna": True,
        "can_analyze_dna": True,
        "can_run_ml": True,
        "can_generate_reports": True,
        "can_view_samples": True
    },
    "VIEWER": {
        "can_view_audit_logs": False,
        "can_manage_users": False,
        "can_upload_dna": False,
        "can_analyze_dna": False,
        "can_run_ml": False,
        "can_generate_reports": False,
        "can_view_samples": True
    }
}

def check_permission(role: str, permission: str) -> bool:
    role_perms = ROLES.get(role.upper(), {})
    return role_perms.get(permission, False)
