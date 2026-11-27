import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Menu, X, ArrowUpRight, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Brand } from './brand';
import { useMember } from './member-context';
export function Header() {
 const [open, setOpen] = useState(false); const { user } = useMember(); const navigate = useNavigate(); const query = useQueryClient();
 async function logout() { await query.cancelQueries(); query.clear(); const { error } = await supabase.auth.signOut(); if (!error) await navigate({ to: '/auth', search: { mode: 'signin' }, replace: true }); }
 return <header className="site-header"><div className="page-width header-inner"><Brand/><nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation"><a href="/#about" onClick={() => setOpen(false)}>About us</a><a href="/#programmes" onClick={() => setOpen(false)}>Programmes</a><a href="/#opportunities" onClick={() => setOpen(false)}>Opportunities</a><a href="/#partners" onClick={() => setOpen(false)}>For employers</a></nav><div className="header-actions">{user ? <><Button variant="ghost" asChild><Link to="/account">My account</Link></Button><Button variant="ghost" size="icon" aria-label="Sign out" title="Sign out" onClick={logout}><LogOut/></Button></> : <><Button variant="ghost" asChild className="sign-in-link"><Link to="/auth" search={{ mode: 'signin' }}>Sign in</Link></Button><Button asChild><Link to="/auth" search={{ mode: 'signup' }}>Get started <ArrowUpRight/></Link></Button></>}<Button variant="ghost" size="icon" className="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div></div></header>;
}
