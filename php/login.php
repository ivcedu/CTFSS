<?php
    $server = "ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
         
    $username = filter_input(INPUT_POST, 'username');
    $password = filter_input(INPUT_POST, 'password');
    $login = "IVCSTAFF\\".$username;
    $result = array();

    $ldapconn = ldap_connect($server);   
    if($ldapconn) {          
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, $login, $password);  
        if($ldapbind) {
            $filter = "(&(objectClass=user)(objectCategory=person)(cn=".$username."))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $ladp_result);

            if ($data != null) {
                if (array_key_exists('displayname', $data[0])) {
                    $display_name = $data[0]["displayname"][0];
                }
                if (array_key_exists('mail', $data[0])) {
                    $email = $data[0]["mail"][0];
                }

                $result = array($display_name, $email);
            }
        }          
        ldap_close($ldapconn);
    }
    echo json_encode($result);