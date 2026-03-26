"use client";

export function ComplianceStrip() {
  return (
    <aside className="rounded-lg border border-amber-900/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-100/90">
      <strong className="font-medium text-amber-200">Compliance</strong>
      <p className="mt-1 text-amber-100/80">
        This UI does not perform KYC/AML or investor accreditation. Hook your
        policy engine, allowlists, and transfer restrictions before production
        issuance or secondary trading.
      </p>
    </aside>
  );
}
