import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { z } from "zod";
import { Shield, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email invalide").max(255),
  password: z.string().min(6, "Minimum 6 caractères").max(128),
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [otpCode, setOtpCode] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const { signIn, signOut, setTwoFaVerified } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    if (error) {
      setLoading(false);
      toast.error("Identifiants incorrects");
      return;
    }

    // Get current user to check admin and send 2FA
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      toast.error("Erreur d'authentification");
      return;
    }

    // Check if admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await signOut();
      setLoading(false);
      toast.error("Accès non autorisé");
      return;
    }

    // Send 2FA code
    const { data: fnData, error: fnError } = await supabase.functions.invoke("send-2fa-code", {
      body: { action: "send_code", user_id: user.id, email: user.email },
    });

    if (fnError) {
      console.error("2FA send error:", fnError);
      await signOut();
      setLoading(false);
      toast.error("Erreur lors de l'envoi du code de vérification");
      return;
    }

    setUserId(user.id);
    setStep("2fa");
    setLoading(false);
    toast.success("Un code de vérification a été envoyé à votre email");
  };

  const handleVerify2FA = async () => {
    if (otpCode.length !== 6) {
      toast.error("Veuillez entrer le code à 6 chiffres");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("send-2fa-code", {
      body: { action: "verify_code", user_id: userId, code: otpCode },
    });

    if (error || !data?.success) {
      setLoading(false);
      toast.error(data?.error || "Code invalide ou expiré");
      return;
    }

    setLoading(false);
    toast.success("Vérification réussie !");
    navigate("/admin");
  };

  const handleBack = async () => {
    await signOut();
    setStep("login");
    setOtpCode("");
    setUserId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Administration</CardTitle>
          <CardDescription>
            {step === "login"
              ? "Connectez-vous pour accéder au tableau de bord"
              : "Entrez le code envoyé à votre email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button onClick={handleVerify2FA} className="w-full" disabled={loading}>
                {loading ? "Vérification..." : "Vérifier le code"}
              </Button>
              <Button variant="ghost" className="w-full" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Retour
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
